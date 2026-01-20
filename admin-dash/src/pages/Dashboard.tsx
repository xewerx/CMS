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
  CircularProgress,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Logout as LogoutIcon,
  Web as WebIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Language as LanguageIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { fetchWebsites, fetchWebsiteDetail, updateWebsite, createWebsite, getCurrentUserId } from '../utils/api'
import type { Website, WebsiteDetail, Content } from '../types/website'
import { SUPPORTED_LANGUAGES } from '../types/website'
import ContentEditor from '../components/ContentEditor'

const DRAWER_WIDTH = 280

function Dashboard() {
  const [username, setUsername] = useState<string>('')
  const [websites, setWebsites] = useState<Website[]>([])
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [websiteDetail, setWebsiteDetail] = useState<WebsiteDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [addLanguageDialogOpen, setAddLanguageDialogOpen] = useState(false)
  const [newLanguage, setNewLanguage] = useState<string>('')
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

    // Fetch websites from API
    loadWebsites()
  }, [navigate])

  const loadWebsites = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWebsites()
      setWebsites(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load websites')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const handleWebsiteSelect = async (websiteId: string) => {
    setSelectedWebsite(websiteId)
    setWebsiteDetail(null)
    setError(null)
    setLoadingDetail(true)
    setSelectedLanguage('en')

    try {
      const detail = await fetchWebsiteDetail(websiteId, 'en')
      setWebsiteDetail(detail)
      if (detail.language) {
        setSelectedLanguage(detail.language)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load website details')
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleLanguageChange = async (language: string) => {
    if (!selectedWebsite) return

    setSelectedLanguage(language)
    setLoadingDetail(true)
    setError(null)

    try {
      const detail = await fetchWebsiteDetail(selectedWebsite, language)
      setWebsiteDetail(detail)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load language version')
    } finally {
      setLoadingDetail(false)
    }
  }

  const getAvailableLanguages = () => {
    if (!selectedWebsite) return []
    const website = websites.find((w) => w.id === selectedWebsite)
    return website?.available_languages || ['en']
  }

  const getUnavailableLanguages = () => {
    const available = getAvailableLanguages()
    return SUPPORTED_LANGUAGES.filter((lang) => !available.includes(lang.code))
  }

  const handleAddLanguageVersion = async () => {
    if (!websiteDetail || !newLanguage) return

    setSaving(true)
    setError(null)

    try {
      const userId = getCurrentUserId()
      if (!userId) {
        setError('Unable to identify user. Please log in again.')
        return
      }

      await createWebsite({
        name: websiteDetail.name,
        language: newLanguage,
        content: websiteDetail.content,
        redactors: [userId],
      })

      setSuccessMessage(`${newLanguage.toUpperCase()} version created successfully!`)
      setAddLanguageDialogOpen(false)
      setNewLanguage('')

      await loadWebsites()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create language version')
    } finally {
      setSaving(false)
    }
  }

  const handleContentChange = (index: number, newContent: Content) => {
    if (!websiteDetail) return
    const newContentArray = [...websiteDetail.content]
    newContentArray[index] = newContent
    setWebsiteDetail({
      ...websiteDetail,
      content: newContentArray,
    })
  }


  const handleSave = async () => {
    if (!websiteDetail || !selectedWebsite) return

    setSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Get current user ID from JWT token
      const userId = getCurrentUserId()
      if (!userId) {
        setError('Unable to identify user. Please log in again.')
        setSaving(false)
        return
      }

      await updateWebsite(selectedWebsite, {
        name: websiteDetail.name,
        language: websiteDetail.language,
        content: websiteDetail.content,
        redactors: [userId], // Include current user as redactor
      })

      setSuccessMessage('Website updated successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

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
              ? `Editing: ${websites.find((w) => w.id === selectedWebsite)?.name || 'Website'}`
              : 'Dashboard'}
          </Typography>

          {selectedWebsite && (
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel sx={{ color: 'white' }}>Language</InputLabel>
              <Select
                value={selectedLanguage}
                label="Language"
                onChange={(e) => handleLanguageChange(e.target.value)}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.7)' },
                  '.MuiSvgIcon-root': { color: 'white' },
                }}
                startAdornment={<LanguageIcon sx={{ mr: 1, color: 'white' }} />}
              >
                {getAvailableLanguages().map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.name || lang.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {selectedWebsite && getUnavailableLanguages().length > 0 && (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<AddIcon />}
              onClick={() => setAddLanguageDialogOpen(true)}
              sx={{ mr: 2 }}
            >
              Add Language
            </Button>
          )}

          {selectedWebsite && websiteDetail && (
            <Button
              variant="contained"
              color="primary"
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={{ ml: 2 }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
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
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <List>
              {websites.map((website) => (
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
                    <Box sx={{ flexGrow: 1 }}>
                      <ListItemText primary={website.name} />
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                        {website.available_languages?.map((lang) => (
                          <Chip
                            key={lang}
                            label={lang.toUpperCase()}
                            size="small"
                            variant="outlined"
                            color={
                              lang === selectedLanguage && selectedWebsite === website.id
                                ? 'primary'
                                : 'default'
                            }
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
              {websites.length === 0 && !loading && (
                <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                  No websites found
                </Typography>
              )}
            </List>
          )}
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
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          {successMessage && (
            <Snackbar
              open={!!successMessage}
              autoHideDuration={6000}
              onClose={() => setSuccessMessage(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
                {successMessage}
              </Alert>
            </Snackbar>
          )}
          {selectedWebsite ? (
            <Box>
              {loadingDetail ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                  <CircularProgress />
                </Box>
              ) : websiteDetail ? (
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {websiteDetail.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                    Edit the content elements below. Changes are saved when you click "Save Changes".
                    You can add or remove elements within list and container types.
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {websiteDetail.content.map((content, index) => (
                      <Box key={index} sx={{ position: 'relative', mb: 2 }}>
                        <ContentEditor
                          content={content}
                          onChange={(newContent) => handleContentChange(index, newContent)}
                          showRemove={false}
                        />
                      </Box>
                    ))}
                    {websiteDetail.content.length === 0 && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        This website has no content elements yet.
                      </Alert>
                    )}
                  </Box>
                </Box>
              ) : (
                <Alert severity="warning">
                  Failed to load website details. Please try selecting the website again.
                </Alert>
              )}
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

      {/* Add Language Dialog */}
      <Dialog open={addLanguageDialogOpen} onClose={() => setAddLanguageDialogOpen(false)}>
        <DialogTitle>Add New Language Version</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This will create a new version of "{websiteDetail?.name}" with the selected language.
            Content will be copied from the current version as a starting point.
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={newLanguage}
              label="Language"
              onChange={(e) => setNewLanguage(e.target.value)}
            >
              {getUnavailableLanguages().map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name} ({lang.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLanguageDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddLanguageVersion}
            variant="contained"
            disabled={!newLanguage || saving}
          >
            {saving ? 'Creating...' : 'Create Version'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Dashboard
