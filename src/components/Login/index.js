import Api from '../../Api'
import './style.css'

export const Login = ({ onReceive }) => {
  const handleFacebookLogin = async () => {
    let result = await Api.fbPopup()
    if (result) {
      onReceive(result.user)
    } else {
      alert('Erro!')
    }
  }

  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com o facebook</button>
    </div>
  )
}
