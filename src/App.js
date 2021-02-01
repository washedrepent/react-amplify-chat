import React, { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listMessages } from './graphql/queries';
import '@aws-amplify/pubsub';
import { onCreateMessage } from '../graphql/subscriptions';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  //loading intial messages (in order)
  useEffect(() => {
      API
        .graphql(graphqlOperation(messagesByChannelId, {
          channelID: '1',
          sortDirection: 'ASC'
        }))
        .then((response) => {
          const items = response?.data?.messagesByChannelID?.items;

          if (items) {
            setMessages(items);
          }
        })
    }, []);

    //for graphql Subcription
    useEffect(() => {
      const subscription = API
        .graphql(graphqlOperation(onCreateMessage))
        .subscribe({
          next: (event) => {
            setMessages([...messages, event.value.data.onCreateMessage]);
          }
        });

      return () => {
        subscription.unsubscribe();
      };
    }, [messages]);

  // Function for handling changes to our chat bar
  const handleChange = (event) => {
    setMessageBody(event.target.value);
  };

  // Function for handling the message form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      channelID: '1',
      author: 'Dave',
      body: messageBody.trim()
    };

    try {
      setMessageBody('');
      await API.graphql(graphqlOperation(createMessage, { input }))
    } catch (error) {
      console.warn(error);
    }
  };


  return (
    <div className="container">
      <div className="messages">
        <div className="messages-scroller">
          { messages.map((message) => (
            <div key={message.id} className={message.author === 'Dave' ? 'message me' : 'message'}>{message.body}</div>
          )) }
        </div>
      </div>
      <div className="chat-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            onChange={handleChange}
            value={messageBody}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
