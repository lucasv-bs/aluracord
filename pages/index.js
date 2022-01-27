import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';


function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}


function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.futuristic["000"]};
                    font-size: 24px;
                    font-weight: 600
                }
            `}</style>
        </>
    );
}


function Link(props) {
  return (    
    <>
      <a href={props.href}>{props.children}</a>
      <style jsx>{`
        a {
          color: ${appConfig.theme.colors.futuristic["001"]};
          text-decoration: none
        }
      `}</style>
    </>
  );
}


export default function HomePage() {
  const [username, setUsername] = React.useState('');
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(/background-circuit-diagram-with-glowing-line-lights.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '4px', 
            padding: '32px', margin: '16px',
            background: "linear-gradient(127deg, " 
              + appConfig.theme.colors.futuristic['005'] + ", " 
              + appConfig.theme.colors.futuristic['006'] + ")",
            boxShadow: '-4px -4px 12px ' + appConfig.theme.colors.futuristic['005'] 
                    + ', 4px 4px 12px ' + appConfig.theme.colors.futuristic['007'] + '',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              router.push('/chat');
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">{appConfig.name}</Title>
            <Text 
              variant="body2" 
              styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.futuristic['000'] }}>
              Olá, de novo {username.length < 3 ? '' : <Link href={`https://github.com/${username}`}>{username}</Link>}
            </Text>

            <TextField
              value={username} 
              onChange={function (event) {
                setUsername(event.target.value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.futuristic['001'], 
                  mainColor: appConfig.theme.colors.futuristic['003'], 
                  mainColorHighlight: appConfig.theme.colors.futuristic['001'],
                  backgroundColor:  appConfig.theme.colors.futuristic['008'],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
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
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              borderRadius: '4px',
              boxShadow: '-2px -2px 12px ' + appConfig.theme.colors.futuristic['005'] 
                      + ', 2px 2px 12px ' + appConfig.theme.colors.futuristic['007'] + '',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: username.length < 3 ? '0' : '50%',
                marginBottom: '16px',
              }}
              src={username.length < 3 ? '/hello-robot.png' : `https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.futuristic['001'],
                backgroundColor: appConfig.theme.colors.futuristic['004'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length < 3 ? 'Informe seu user' :
                <Link 
                  href={`https://github.com/${username}`}
                >
                  {username}
                </Link>
              }
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}