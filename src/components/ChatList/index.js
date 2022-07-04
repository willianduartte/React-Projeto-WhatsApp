import { useEffect, useState } from 'react'
import './style.css'

export const ChatList = ({ onClick, active, data }) => {
  const [time, setTime] = useState()

  useEffect(() => {
    if (data.lastMessageDate > 0) {
      let d = new Date(data.lastMessageDate.seconds * 1000)
      let hours = d.getHours()
      let minutes = d.getMinutes()
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      setTime(`${hours}:${minutes}`)
    }
  }, [data])

  return (
    <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
      <img className="chatListItemAvatar" src={data.image} alt="" />
      <div className="chatListItemLines">
        <div className="chatListItemLine">
          <div className="chatListItemName">{data.title}</div>
          <div className="chatListItemData">{time}</div>
        </div>
        <div className="chatListItemLine">
          <div className="chatListItemLastMensage">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
