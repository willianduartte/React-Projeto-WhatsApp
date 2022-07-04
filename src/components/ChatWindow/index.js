import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import Api from '../../Api'
import { MessageItem } from '../MessageItem'

import './style.css'

export const ChatWindow = ({ user, data, setClickOnChat, clickOnChat }) => {
  let recognition = null
  let SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const body = useRef()

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])

  useEffect(() => {
    setList([])
    let unsub = Api.onChatContent(data.chatId, setList, setUsers)
    return unsub
  }, [data.chatId])

  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji)
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true)
      }
      recognition.onend = () => {
        setListening(false)
      }
      recognition.onresult = e => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()
    }
  }

  const handleInputKeyUp = e => {
    if (e.keyCode == '13') {
      handleSendClick()
    }
  }
  const handleSendClick = () => {
    if (text !== '') {
      Api.sentMessage(data, user.id, 'text', text, users)
      setText('')
      setEmojiOpen(false)
    }
  }

  const handleBackButton = () => {
    setClickOnChat(false)
  }

  return (
    <div className={`chatWindow ${clickOnChat ? 'clickOnChat' : ''}`}>
      <div className="chatWindowHeader">
        <div className="chatWindowHeaderInfo">
          <div className="chatWindowBackArrow" onClick={handleBackButton}>
            <svg viewBox="0 0 24 24" width="24" height="24" class="">
              <path
                fill="currentColor"
                d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
              ></path>
            </svg>
          </div>
          <img className="chatWindowAvatar" src={data.image} alt="" />
          <div className="chatWindowName">{data.title}</div>
        </div>
        <div className="chatWindowHeaderButtons">
          <div className="chatWindowBtn">
            <svg viewBox="0 0 24 24" width="24" height="24" class="">
              <path
                fill="currentColor"
                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
              ></path>
            </svg>
          </div>
          <div className="chatWindowBtn">
            <svg viewBox="0 0 24 24" width="24" height="24" class="">
              <path
                fill="currentColor"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div ref={body} className="chatWindowBody">
        {list.map((item, index) => (
          <MessageItem key={index} data={item} user={user} />
        ))}
      </div>

      <div
        className="chatWindowEmojiArea"
        style={{ height: emojiOpen ? '300px' : '0px' }}
      >
        <EmojiPicker
          disableSearchBar
          disableSkinTonePicker
          onEmojiClick={handleEmojiClick}
        />
      </div>

      <div className="chatWindowFooter">
        <div className="chatWindowPreInput">
          <div
            className="chatWindowBtn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class=""
            >
              <path d="m19.1 17.2-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"></path>
            </svg>
          </div>
          <div className="chatWindowBtn" onClick={handleOpenEmoji}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ekdr8vow dhq51u3o"
            >
              <path
                style={{ fill: emojiOpen ? '#008069' : '#54656F' }}
                fill="currentColor"
                d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
              ></path>
            </svg>
          </div>
          <div className="chatWindowBtn">
            <svg viewBox="0 0 24 24" width="24" height="24" class="">
              <path
                fill="currentColor"
                d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="chatWindowInputArea">
          <input
            className="chatWindowInput"
            type="text"
            placeholder="Mensagem"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="chatWindowPosInput">
          {text === '' && (
            <div onClick={handleMicClick} className="chatWindowBtn">
              <svg viewBox="0 0 24 24" width="24" height="24" class="">
                <path
                  style={{ fill: listening ? '#FF4E44' : '' }}
                  fill="currentColor"
                  d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
                ></path>
              </svg>
            </div>
          )}
          {text !== '' && (
            <div onClick={handleSendClick} className="chatWindowBtn">
              <svg viewBox="0 0 24 24" width="24" height="24" class="">
                <path
                  fill="currentColor"
                  d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
