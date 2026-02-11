import React, { useState } from 'react';
import { Button, Container, Typography, Box, Paper, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function App() {
  // Logic: Starts relative (side-by-side), then becomes fixed (floating)
  const [noPos, setNoPos] = useState({ top: 'auto', left: 'auto', relative: true });
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noIndex, setNoIndex] = useState(0);

  const noMessages = [
    "No", 
    "Are you sure? 🤨", 
    "Last chance! ⚠️", 
    "You will regret this! 😭",
    "Don't be so cold! ❄️", 
    "Change of heart? ❤️‍🩹", 
    "Is this your final answer? 🛑",
    "Think again! 🤔", 
    "I'm gonna cry... 🥺", 
    "You're breaking my heart 💔"
  ];

  const moveNo = () => {
    // Generate random coordinates, but stay away from the center (where YES button is)
    // We use values that keep it mostly in the outer 60% of the screen
    const randomTop = Math.floor(Math.random() * 70 + 15) + '%';
    const randomLeft = Math.floor(Math.random() * 70 + 15) + '%';
    
    setNoPos({ top: randomTop, left: randomLeft, relative: false });
    setYesScale(prev => Math.min(prev + 0.4, 8)); // Cap growth at 8x to avoid covering everything
    setNoIndex((prev) => (prev + 1) % noMessages.length);
  };

  const handleYes = async () => {
    setIsAccepted(true);
    try {
      // Connects to your Node.js backend
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/propose`);
    } catch (err) {
      console.error("Email notification failed, but she said YES! ❤️");
    }
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #ffebee 30%, #fce4ec 90%)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* --- Background Floating Hearts --- */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0] }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            fontSize: Math.random() * 20 + 15,
            zIndex: 0,
            filter: 'drop-shadow(0 0 5px rgba(255,192,203,0.3))'
          }}
        >
          ❤️
        </motion.div>
      ))}

      <AnimatePresence>
        {!isAccepted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ zIndex: 1 }}
          >
            <Paper 
              elevation={20} 
              sx={{ 
                p: 5, textAlign: 'center', borderRadius: 10, 
                width: '90vw', maxWidth: '500px', minHeight: '480px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(15px)',
                border: '2px solid white'
              }}
            >
              <Box>
                {/* --- Animated Teddy Bear --- */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ fontSize: '80px', marginBottom: '10px' }}
                >
                  🧸❤️
                </motion.div>
                
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#444', lineHeight: 1.2 }}>
                  Will you be my Valentine?
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
                <Stack 
                  direction="row" 
                  spacing={noPos.relative ? 3 : 0} 
                  alignItems="center" 
                  justifyContent="center"
                >
                  <Button 
                    variant="contained" 
                    onClick={handleYes}
                    sx={{ 
                      bgcolor: '#ff4d4d', 
                      '&:hover': { bgcolor: '#ff1a1a' },
                      transform: `scale(${yesScale})`,
                      transition: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      fontSize: '1.3rem',
                      borderRadius: '50px',
                      px: 6,
                      zIndex: 5, // Lower than NO button
                      boxShadow: '0 10px 20px rgba(255, 77, 77, 0.3)'
                    }}
                  >
                    YES!
                  </Button>

                  <Button 
                    variant="outlined" 
                    onMouseEnter={moveNo}
                    onClick={moveNo} 
                    sx={{ 
                      position: noPos.relative ? 'relative' : 'fixed', 
                      top: noPos.top, 
                      left: noPos.left, 
                      transition: '0.15s ease-out',
                      borderColor: '#ff4d4d',
                      color: '#ff4d4d',
                      transform: noPos.relative ? 'none' : 'translate(-50%, -50%)',
                      fontWeight: 'bold',
                      background: 'white',
                      whiteSpace: 'nowrap',
                      zIndex: 100, // HIGHEST z-index to stay on top
                      '&:hover': { background: '#fff0f0', borderColor: '#ff4d4d' }
                    }}
                  >
                    {noMessages[noIndex]}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h1" sx={{ mb: 2 }}>🧸💝🎉</Typography>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ff4d4d' }}>
                SUCCESS!
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, color: '#666' }}>
                Notification sent! Time to plan the date. ❤️
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default App;