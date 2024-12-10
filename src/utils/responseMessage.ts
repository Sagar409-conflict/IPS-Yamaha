export const responseMessage = (msgType:string, action = '', module = 'Data'):string => {
  const messages: Record<string, string> = {
    error: `Error in ${action} data`,
    success: `${module} ${action} successfully`,
    wrong: 'Something went wrong.',
    not_found: `No such ${action} exists`,
    empty_body: 'Please enter some data',
    name_used: `This ${action} is already in use.`,
    email_not_matched: 'The email address provided does not match our records. Please try again.',
    email_not_verified: 'The email address provided is not verified.',
    email_send: 'Email sent successfully',
    email_send_error: 'Error while sending email',
    password_update: 'Password updated successfully',
    missing: `Please provide ${action}`,
    session_expired: 'Your session has expired',
    not_allowed: `${module} is not allowed to ${action}`,
    invalid_otp: `Invalid otp`,
    valid_otp: `Otp verification success`,
    expired: `${action} is expired`,
    incomplete_profile: `Please complete your profile first`,
    incorrect: `${action} is incorrect`,
  }
  return messages[ msgType ] || 'No message'
}
