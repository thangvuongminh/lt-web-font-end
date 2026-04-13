import PropTypes from 'prop-types'

const AuthWrapper = ({ title, subtitle, children, bottomAction }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>}
        </div>
        {children}
        {bottomAction && <div className="mt-6 text-center text-sm text-gray-600">{bottomAction}</div>}
      </div>
    </div>
  )
}

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  bottomAction: PropTypes.node,
}

AuthWrapper.defaultProps = {
  subtitle: '',
  bottomAction: null,
}

export default AuthWrapper
