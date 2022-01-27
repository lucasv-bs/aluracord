import { Box, Button, Text, TextField, Image } from '@skynexui/components';

export default function ChatPage() {
    return (
        <>
          <Box
            styleSheet={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundImage: 'url(/background-circuit-diagram-with-glowing-line-lights.jpg)',
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
          >
          </Box>
          {/* 
            ***** Image credits *****
            Background: <a href='https://br.freepik.com/fotos-vetores-gratis/fundo'>Fundo vetor criado por starline - br.freepik.com</a>
          */}
        </>
      );
}