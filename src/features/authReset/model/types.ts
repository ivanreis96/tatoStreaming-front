export type AuthResetStatus = {
    type: 'success' | 'error'
    message: string
}

export type ForgotPasswordFormData = {
    email: string
}

export type ResetPasswordFormData = {
    password: string
    confirmPassword: string
}

export type ForgotPasswordSubmitPayload = {
    email: string
}

export type ResetPasswordSubmitPayload = {
    token: string
    password: string
}

export type ForgotPasswordSubmitAction = (payload: ForgotPasswordSubmitPayload) => Promise<void | { message?: string }>

export type ResetPasswordSubmitAction = (payload: ResetPasswordSubmitPayload) => Promise<void | { message?: string }>