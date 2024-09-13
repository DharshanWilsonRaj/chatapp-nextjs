import style from './style.module.css'

const ChatContainer = (props) => {
    const {
        handleSendMessage = () => { },
        setInput = () => { },
        input = '',
        receiver = null,
        chats = [] } = props

    return (
        <div className={style.ChatContainer}>
            {
                receiver?.id ? <>
                    <div className={style.username}>
                        <span>{receiver?.name}</span>
                    </div>
                    <div className={style.message_container}>
                        {chats?.map((chat, index) => (
                            <div key={index} className={chat?.sendByCurrentUser ? style.message : style.message_receiver}>
                                {chat?.message}
                            </div>))}
                    </div>
                    <div className={style.chat_input_container}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={style.chat_input}
                        />
                        <button onClick={handleSendMessage} className={style.sendBtn}>Send</button>
                    </div>
                </> : <> <h1>Chat with user</h1></>
            }

        </div>
    )
}

export default ChatContainer
