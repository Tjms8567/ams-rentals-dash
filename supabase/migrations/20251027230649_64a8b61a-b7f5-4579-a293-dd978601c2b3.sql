-- Remove tenant role from admin user to ensure admin access
DELETE FROM user_roles 
WHERE user_id = '838ac604-72e1-4da2-9674-0b83927533ab' 
AND role = 'tenant';