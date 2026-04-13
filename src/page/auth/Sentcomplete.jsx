import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { resetPassword } from '../../Api'

const resetPasswordSchema = yup.object({
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  newPassword: yup
    .string()
    .min(3, 'At least 3 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
    .required('Confirm password is required'),
})

const Sentcomplete = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const otpInputsRef = useRef([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    setValue('otp', otpValues.join(''))
  }, [otpValues, setValue])

  const onSubmit = async (data) => {
    setErrorMsg('')
    setSuccessMsg('')
    try {
      await resetPassword(data)
      setSuccessMsg('Password reset successful!')
      reset()
      setTimeout(() => navigate('/account/login'), 1200)
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Password reset failed'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-800">
      
      <div className="w-full max-w-md p-6">
        
        <h2 className="text-3xl font-light text-center mb-8 text-gray-800">
          Reset your password
        </h2>

        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">
        <p class="text-center">
        Your reset request has been sent successfully. <br />
        Please enter the OTP to continue.
        </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center text-sm">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Enter OTP (6 digits)
            </label>
            <div className="flex gap-2 justify-center">
              {otpValues.map((value, index) => (
                <input
                  key={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  ref={(el) => (otpInputsRef.current[index] = el)}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, '')
                    if (!newValue && value === '') {
                      return
                    }
                    const updated = [...otpValues]
                    updated[index] = newValue.slice(-1)
                    setOtpValues(updated)
                    if (newValue && index < otpValues.length - 1) {
                      otpInputsRef.current[index + 1]?.focus()
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
                      const prevIndex = index - 1
                      const updated = [...otpValues]
                      updated[prevIndex] = ''
                      setOtpValues(updated)
                      otpInputsRef.current[prevIndex]?.focus()
                    }
                  }}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
                />
              ))}
            </div>
            <input type="hidden" {...register('otp')} />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register('newPassword')}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting }
            className="w-full bg-[#E93C60] hover:bg-[#d43355] text-white py-2.5 rounded text-sm font-medium transition-colors mt-2 "
          >
            {isSubmitting ? 'Processing...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-700">
            <button
              type="button"
              onClick={() => navigate('/account/login')}
              className="text-[#6592B8] hover:underline"
            >
              Back to login
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Sentcomplete