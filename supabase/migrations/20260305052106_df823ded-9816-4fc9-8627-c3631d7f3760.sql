
-- Notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info', -- 'info', 'warning', 'success'
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON public.notifications (user_id, is_read, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can read own notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can update own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- System inserts via triggers (SECURITY DEFINER functions)
-- No direct INSERT policy needed for users

-- Function to notify a user
CREATE OR REPLACE FUNCTION public.notify_user(
  _user_id UUID,
  _title TEXT,
  _message TEXT,
  _type TEXT DEFAULT 'info',
  _metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, metadata)
  VALUES (_user_id, _title, _message, _type, _metadata);
END;
$$;

-- Function to notify ALL users with a specific role
CREATE OR REPLACE FUNCTION public.notify_role(
  _role app_role,
  _title TEXT,
  _message TEXT,
  _type TEXT DEFAULT 'info',
  _metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, metadata)
  SELECT ur.user_id, _title, _message, _type, _metadata
  FROM public.user_roles ur
  WHERE ur.role = _role;
END;
$$;

-- Trigger: when user_roles changes, notify the affected user
CREATE OR REPLACE FUNCTION public.on_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM notify_user(NEW.user_id, 'Rol asignado', 'Se te ha asignado el rol: ' || NEW.role::text, 'success');
  ELSIF TG_OP = 'UPDATE' AND OLD.role IS DISTINCT FROM NEW.role THEN
    PERFORM notify_user(NEW.user_id, 'Rol actualizado', 'Tu rol ha cambiado a: ' || NEW.role::text, 'info');
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM notify_user(OLD.user_id, 'Rol removido', 'Se ha removido tu rol: ' || OLD.role::text, 'warning');
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_role_change
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.on_role_change();

-- Trigger: when module permissions change, notify the user
CREATE OR REPLACE FUNCTION public.on_module_permission_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM notify_user(NEW.user_id, 'Permiso de módulo', 'Se te ha dado acceso al módulo: ' || NEW.module_key, 'success');
  ELSIF TG_OP = 'UPDATE' AND OLD.has_access IS DISTINCT FROM NEW.has_access THEN
    IF NEW.has_access THEN
      PERFORM notify_user(NEW.user_id, 'Acceso habilitado', 'Ahora tienes acceso al módulo: ' || NEW.module_key, 'success');
    ELSE
      PERFORM notify_user(NEW.user_id, 'Acceso revocado', 'Se ha revocado tu acceso al módulo: ' || NEW.module_key, 'warning');
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM notify_user(OLD.user_id, 'Permiso removido', 'Se ha removido tu acceso al módulo: ' || OLD.module_key, 'warning');
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_module_permission_change
  AFTER INSERT OR UPDATE OR DELETE ON public.user_module_permissions
  FOR EACH ROW EXECUTE FUNCTION public.on_module_permission_change();

-- Trigger: when app_settings change, notify all admins
CREATE OR REPLACE FUNCTION public.on_settings_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_role('admin'::app_role, 'Configuración actualizada', 'Se ha modificado: ' || NEW.label, 'info');
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_settings_change
  AFTER UPDATE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.on_settings_change();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
