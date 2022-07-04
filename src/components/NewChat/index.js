import { useEffect, useState } from 'react'
import Api from '../../Api'
import './style.css'

export const NewChat = ({ user, chatList, show, setShow }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await Api.getContactList(user.id)
        setList(results)
      }
    }
    getList()
  }, [user])

  const addNewChat = async user2 => {
    await Api.addNewChat(user, user2)

    handleClose()
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className="newChat" style={{ left: show ? 0 : -700 }}>
      <div className="newChatHead">
        <div onClick={handleClose} className="newChatBackButton">
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path
              style={{ fill: 'white' }}
              fill="currentColor"
              d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
            ></path>
          </svg>
        </div>
        <div className="newChatHeadTitle">Nova Conversa</div>
      </div>
      <div className="newChatList">
        {list.map((item, index) => (
          <div
            onClick={() => addNewChat(item)}
            className="newChatItem"
            key={index}
          >
            <img className="newChatItemAvatar" src={item.avatar} alt="" />
            <div className="newChatItemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
