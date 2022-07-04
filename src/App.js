import './App.css'
import Api from './Api'
import { useEffect, useState } from 'react'
import { ChatWindow } from './components/ChatWindow'
import { ChatIntro } from './components/ChatIntro'
import { ChatList } from './components/ChatList'
import { NewChat } from './components/NewChat'
import { Login } from './components/Login'

function App() {
  const [chatList, setChatList] = useState([])
  const [activeChat, setActiveChat] = useState({})
  const [clickOnChat, setClickOnChat] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList)
      return unsub
    }
  }, [user])

  const [showNewChat, setShowNewChat] = useState(false)

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const handleLoginData = async u => {
    console.log(u.photoURL)
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    await Api.addUser(newUser)
    setUser(newUser)
  }

  if (user === null) {
    return <Login onReceive={handleLoginData} />
  }

  return (
    <div className="appWindow">
      <div className={`sideBar ${clickOnChat ? 'clickOnChat' : ''}`}>
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className="headerAvatar" src={user.avatar} alt="" />
          <div className="headerButtons">
            <div className="hederBtn">
              <svg
                version="1.1"
                id="ee51d023-7db6-4950-baf7-c34874b80976"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class=""
              >
                <path
                  fill="currentColor"
                  d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                ></path>
              </svg>
            </div>
            <div className="hederBtn" onClick={handleNewChat}>
              <svg viewBox="0 0 24 24" width="24" height="24" class="">
                <path
                  fill="currentColor"
                  d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                ></path>
              </svg>
            </div>
            <div className="hederBtn">
              <svg viewBox="0 0 24 24" width="24" height="24" class="">
                <path
                  fill="currentColor"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                ></path>
              </svg>
            </div>
          </div>
        </header>
        <div className="search">
          <div className="searchInput">
            <svg viewBox="0 0 24 24" width="24" height="24" class="">
              <path
                fill="currentColor"
                d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
              ></path>
            </svg>
            <input
              type="search"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>
        </div>
        <div className="chatList" onClick={() => setClickOnChat(true)}>
          {chatList.map((item, index) => (
            <ChatList
              key={index}
              data={item}
              onClick={() => setActiveChat(chatList[index])}
              active={activeChat.chatId === chatList[index].chatId}
            />
          ))}
        </div>
      </div>
      <div className="contentArea">
        {activeChat.chatId !== undefined && (
          <ChatWindow
            data={activeChat}
            user={user}
            clickOnChat={clickOnChat}
            setClickOnChat={setClickOnChat}
          />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  )
}

export default App
