import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Container,
  Avatar,
  Chip,
} from '@mui/material'
import {
  Logout as LogoutIcon,
  Web as WebIcon,
  Person as PersonIcon,
} from '@mui/icons-material'

const DRAWER_WIDTH = 280

interface Website {
  id: string
  name: string
}

function Dashboard() {
  const [username, setUsername] = useState<string>('')
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      // If no username, redirect to login
      navigate('/login')
      return
    }

    // Check if token exists
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
      return
    }

    // TODO: Fetch websites from API when endpoint is available
    // For now, using mock data
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const handleWebsiteSelect = (websiteId: string) => {
    setSelectedWebsite(websiteId)
    // TODO: Load website content for editing
  }

  // Mock websites for now - replace with API call when available
  const mockWebsites: Website[] = [
    { id: '1', name: 'Website 1' },
    { id: '2', name: 'Website 2' },
  ]

  const displayWebsites = mockWebsites

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {selectedWebsite
              ? `Editing: ${displayWebsites.find((w) => w.id === selectedWebsite)?.name || 'Website'}`
              : 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '64px !important',
            px: 2,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            CMS Admin
          </Typography>
        </Toolbar>
        <Divider />

        {/* User Info Section */}
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                {username || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ mb: 2 }}
          >
            Logout
          </Button>
        </Box>

        <Divider />

        {/* Websites Section */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="overline"
            sx={{ px: 2, fontWeight: 'bold', color: 'text.secondary' }}
          >
            Websites
          </Typography>
          <List>
            {displayWebsites.map((website) => (
              <ListItem key={website.id} disablePadding>
                <ListItemButton
                  selected={selectedWebsite === website.id}
                  onClick={() => handleWebsiteSelect(website.id)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <WebIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText primary={website.name} />
                  {selectedWebsite === website.id && (
                    <Chip
                      label="Active"
                      size="small"
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {selectedWebsite ? (
            <Box>
              <Typography variant="h4" gutterBottom>
                {displayWebsites.find((w) => w.id === selectedWebsite)?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Website content editor will be displayed here.
              </Typography>
              {/* TODO: Add website content editing interface */}
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome to Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Select a website from the sidebar to start editing.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default Dashboard
