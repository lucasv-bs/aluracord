import { Box, Text, TextField, Image, Button, Provider } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


export async function getServerSideProps() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  return {
    props: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    }
  }
}


function messageListener(supabaseClient, addMessage) {
  return supabaseClient
    .from('messages')
    .on('INSERT', (liveResponse) => {
      addMessage(liveResponse.new)
    })
    .subscribe();
}


export default function ChatPage({SUPABASE_URL, SUPABASE_ANON_KEY}) {  
  const [message, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState([]);
  const router = useRouter();
  const username = router.query.username ? router.query.username : '';
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


  React.useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', {ascending: false})
      .then(( {data} ) => {
        setMessageList(data);
      });
      
    messageListener(supabaseClient, (newMessage) => {
      setMessageList((actualMessageList) => {
        return [
          newMessage,
          ...actualMessageList
        ];
      })
    });
  }, []);

  
  function handleNewMessage(newMessage) {
    const messageObject = {
      from: username,
      messageText: newMessage
    };
    
    supabaseClient
      .from('messages')
      .insert([
        messageObject
      ])
      .then(({ data }) => {})
    
    setMessage('');
  }

  
  function handleDeleteMessage(deletedMessageId) {
    const filteredMessageList = messageList.filter((messageFiltered) => {
      return messageFiltered.id != deletedMessageId
    });
    
    setMessageList(filteredMessageList);
  }
  

  return (      
    <>      
      <Box
          styleSheet={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: appConfig.theme.colors.primary[500],
              backgroundImage: `url(/background-circuit-diagram-with-glowing-line-lights.jpg)`,
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
              color: appConfig.theme.colors.neutrals['000']
          }}
      >
          <Box
              styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  borderRadius: '4px',
                  background: "linear-gradient(127deg, " 
                    + appConfig.theme.colors.futuristic['005'] + ", " 
                    + appConfig.theme.colors.futuristic['006'] + ")",
                  boxShadow: '-4px -4px 12px ' + appConfig.theme.colors.futuristic['005'] 
                          + ', 4px 4px 12px ' + appConfig.theme.colors.futuristic['007'] + '',
                  height: '100%',
                  maxWidth: '95%',
                  maxHeight: '95vh',
                  padding: '32px',
              }}
          >
              <Header />
              <Box
                  styleSheet={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      borderRadius: '4px',
                      backgroundColor: appConfig.theme.colors.futuristic['008'],
                      height: '80%',
                      position: 'relative',
                      padding: '16px',
                  }}
              >
                  <MessageList messages={messageList} deleteMessage={handleDeleteMessage}/>
                  
                  
                  <Box
                      as="form"
                      styleSheet={{
                          display: 'flex',
                          alignItems: 'center',
                      }}
                  >
                      <TextField
                          value={message}
                          onChange={(event) => {
                            const textValue = event.target.value;
                            setMessage(textValue);
                          }}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();

                              handleNewMessage(message);
                            }
                          }}
                          placeholder="Insira sua messagem aqui..."
                          type="textarea"                          
                          styleSheet={{
                              border: '0',
                              borderRadius: '4px',
                              backgroundColor: appConfig.theme.colors.futuristic['008'],
                              color: appConfig.theme.colors.futuristic['000'],
                              marginRight: '12px',
                              padding: '6px 8px',
                              resize: 'none',
                              width: '100%',
                          }}
                      />
                      <ButtonSendSticker
                        onStickerClick={(sticker) => {
                          handleNewMessage(`:sticker: ${sticker}`);
                        }}
                      />
                  </Box>
              </Box>
          </Box>
      </Box>
    </>
  )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text 
                  variant='heading5'
                  styleSheet={{
                    color: appConfig.theme.colors.futuristic['000'],
                  }}
                >
                    Chat
                </Text>
                <Button
                    label='Logout'
                    href="/"
                    styleSheet={{
                      color: appConfig.theme.colors.futuristic['001'],
                      backgroundColor: appConfig.theme.colors.futuristic['003'],
                      hover: {
                        color: appConfig.theme.colors.futuristic['000'],
                        backgroundColor: appConfig.theme.colors.futuristic['001']
                      },
                      focus: {
                        color: appConfig.theme.colors.futuristic['000'],
                        backgroundColor: appConfig.theme.colors.futuristic['001']
                      },
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const handleDeleteMessage = props.deleteMessage;
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.futuristic["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
              return (
                <Text
                  key={message.id}
                  tag="li"
                  styleSheet={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: '5px',
                      padding: '6px',
                      marginBottom: '12px',
                      hover: {
                          backgroundColor: appConfig.theme.colors.futuristic['009'],
                      }
                  }}
                >
                  <Box
                    styleSheet={{
                      marginBottom: '8px',
                      maxWidth: '90%',
                  }}
                  >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${message.from}.png`}
                        />
                        <Text tag="strong">
                            Mensagem de: {message.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.futuristic['000'],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </Box>
                    {
                      message.messageText.startsWith(':sticker:')
                        ? (
                            <Image
                              src={message.messageText.replace(':sticker:','')}
                              styleSheet={{
                                maxWidth: '75px',
                                height: 'auto',
                              }}
                            />
                        )
                        : (
                            message.messageText
                        )
                    }                    
                  </Box>
                  <Text                     
                    onClick={() => {handleDeleteMessage(message.id)}}
                    styleSheet={{                      
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: appConfig.theme.colors.futuristic['002'],
                      backgroundColor: appConfig.theme.colors.futuristic['010'],
                      borderRadius: '100%',                      
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      width: '35px',
                      height: '35px',
                      hover: {
                        backgroundColor: appConfig.theme.colors.futuristic['011'],
                      }
                    }}
                    tag="span"
                  >
                    X
                  </Text>
                </Text>
              );
            })}
        </Box>
    )
}