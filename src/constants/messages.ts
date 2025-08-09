export const ERROR_MESSAGES = {
  // Mensagens de erro gerais
  GENERIC_LOGIN_ERROR: 'Erro ao fazer login',
  GENERIC_REGISTER_ERROR: 'Erro ao criar conta',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  
  // Mensagens de erro específicas de autenticação
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado',
  WEAK_PASSWORD: 'Senha muito fraca',
  INVALID_EMAIL_FORMAT: 'Formato de email inválido',
  
  // Mensagens de validação de formulário
  REQUIRED_FIELD: 'Este campo é obrigatório',
  EMAIL_REQUIRED: 'Email é obrigatório',
  EMAIL_INVALID: 'Email deve ter um formato válido',
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  PASSWORD_MIN_LENGTH: 'Senha deve ter pelo menos 6 caracteres',
  PASSWORD_MIN_LENGTH_REGISTER: 'Senha deve ter pelo menos 8 caracteres',
  PASSWORD_COMPLEXITY: 'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número',
  CONFIRM_PASSWORD_REQUIRED: 'Confirmação de senha é obrigatória',
  PASSWORDS_MUST_MATCH: 'Senhas devem ser iguais',
  FIRST_NAME_REQUIRED: 'Primeiro nome é obrigatório',
  FIRST_NAME_MIN_LENGTH: 'Primeiro nome deve ter pelo menos 2 caracteres',
  LAST_NAME_REQUIRED: 'Sobrenome é obrigatório',
  LAST_NAME_MIN_LENGTH: 'Sobrenome deve ter pelo menos 2 caracteres',
} as const;

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Conta criada com sucesso! Faça login para continuar.',
  LOGIN_SUCCESS: 'Login realizado com sucesso!',
  PASSWORD_RESET_SENT: 'Email de recuperação enviado com sucesso!',
} as const;

export const INFO_MESSAGES = {
  PASSWORD_HELPER: 'Mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número',
  LOADING_LOGIN: 'Entrando...',
  LOADING_REGISTER: 'Criando conta...',
} as const;
