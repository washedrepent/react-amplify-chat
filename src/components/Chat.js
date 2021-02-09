import React, { useEffect, useState, setState } from 'react';

import { Auth } from 'aws-amplify'
import API, { graphqlOperation } from '@aws-amplify/api';
import '@aws-amplify/pubsub';

import { createMessage } from '../graphql/mutations';
import { onCreateMessage } from '../graphql/subscriptions';
import { messagesByChannelId } from '../graphql/queries';

import { ChatFeed, Message } from 'react-chat-ui';

import './Chat.css';
import Container from './Container'

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  //check if logged in
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .catch(() => {
        props.history.push('/');
      })
  }, [props]);

  //loading intial messages (in order)
  useEffect(() => {
      API
        .graphql(graphqlOperation(messagesByChannelId, {
          channelID: '1',
          sortDirection: 'ASC'
        }))
        .then((response) => {
          const items = response?.data?.messagesByChannelID?.items;

          console.log(items);
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
    <Container>
      <div className="container">
      <ChatFeed
          chatBubble={false}
          messages={ messages.map(
              message =>
                new Message({
                  id: message.author === 'Dave' ? 0 : message.author,
                  senderName: message.author,
                  message: message.body,
                })
          )
          } // Array: list of message objects
          isTyping={false} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={
            {
              text: {
                fontSize: '1.2em',
                fontWeight: 400,
              },
              chatbubble: {
                borderRadius: 12,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft:15,
                paddingRight:15,
                marginTop: 5
              }
            }
          }
        />
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
    </Container>
  );
  /*
  return (
    <Container>
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
    </Container>
  );*/
};

export default Chat;
