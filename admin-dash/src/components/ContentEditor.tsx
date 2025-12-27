import { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Chip,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  TextFields as TextIcon,
  Image as ImageIcon,
  List as ListIcon,
  Folder as ContainerIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material'
import type { Content } from '../types/website'

interface ContentEditorProps {
  content: Content
  onChange: (content: Content) => void
  level?: number
  onRemove?: () => void
  showRemove?: boolean
}

function ContentEditor({ content, onChange, level = 0 }: ContentEditorProps) {
  const [expanded, setExpanded] = useState(false)
  const [addMenuAnchor, setAddMenuAnchor] = useState<null | HTMLElement>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newElementType, setNewElementType] = useState<Content['type']>('text')

  const handleValueChange = (newValue: string) => {
    onChange({
      ...content,
      value: newValue,
    })
  }

  const handleElementChange = (index: number, newElement: Content) => {
    if (!content.elements) return
    const newElements = [...content.elements]
    newElements[index] = newElement
    onChange({
      ...content,
      elements: newElements,
    })
  }

  const handleAddElement = (type: Content['type']) => {
    let newElement: Content = {
      type,
      value: '',
    }

    // For lists, if there are existing elements, use the same type as the first element
    if (content.type === 'list' && content.elements && content.elements.length > 0) {
      const firstElement = content.elements[0]
      newElement.type = firstElement.type
      
      // If it's a list of containers, copy the structure from the first container
      if (firstElement.type === 'container' && firstElement.elements) {
        // Deep copy the structure but with empty values
        const copyStructure = (el: Content): Content => {
          const copied: Content = {
            type: el.type,
            value: '',
            ...(el.id ? { id: el.id } : {}),
            ...(el.path ? { path: el.path } : {}),
          }
          
          // Recursively copy nested elements if they exist
          if (el.elements && el.elements.length > 0) {
            copied.elements = el.elements.map(copyStructure)
          }
          
          return copied
        }
        
        newElement.elements = firstElement.elements.map(copyStructure)
      }
      // For non-container types (text, image), the type is already set above
    } else {
      // For containers or empty lists, use the selected type
      // Add elements array for container and list types when creating new
      if (type === 'container' || type === 'list') {
        newElement.elements = []
      }
    }

    // Automatically inherit path from parent list if available
    if (content.type === 'list' && content.path) {
      newElement.path = content.path
    }

    const currentElements = content.elements || []
    onChange({
      ...content,
      elements: [...currentElements, newElement],
    })
    setAddDialogOpen(false)
    setAddMenuAnchor(null)
  }

  const handleRemoveElement = (index: number) => {
    if (!content.elements) return
    const newElements = content.elements.filter((_, i) => i !== index)
    onChange({
      ...content,
      elements: newElements,
    })
  }

  const deepCopyElement = (element: Content): Content => {
    const copied: Content = {
      type: element.type,
      value: element.value,
      ...(element.id ? { id: element.id } : {}),
      ...(element.path ? { path: element.path } : {}),
    }

    if (element.elements && element.elements.length > 0) {
      copied.elements = element.elements.map((el) => deepCopyElement(el))
    }

    return copied
  }

  const handleCopyElement = (index: number) => {
    if (!content.elements) return
    const elementToCopy = content.elements[index]
    const copiedElement = deepCopyElement(elementToCopy)
    
    // Insert the copied element right after the original
    const newElements = [...content.elements]
    newElements.splice(index + 1, 0, copiedElement)
    
    onChange({
      ...content,
      elements: newElements,
    })
  }

  const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
    // For lists with existing elements, add directly without showing menu
    if (content.type === 'list' && content.elements && content.elements.length > 0) {
      const firstElementType = content.elements[0].type
      handleAddElement(firstElementType)
      return
    }
    
    // Show menu to select type for containers or empty lists
    setAddMenuAnchor(event.currentTarget)
  }

  const handleAddFromDialog = () => {
    // Path will be automatically inherited from parent list if available
    handleAddElement(newElementType)
  }

  const handleMenuSelect = (type: Content['type']) => {
    setNewElementType(type)
    setAddMenuAnchor(null)
    setAddDialogOpen(true)
  }

  const getIcon = () => {
    switch (content.type) {
      case 'text':
        return <TextIcon />
      case 'image':
        return <ImageIcon />
      case 'list':
        return <ListIcon />
      case 'container':
        return <ContainerIcon />
      default:
        return <TextIcon />
    }
  }

  const getColor = () => {
    switch (content.type) {
      case 'text':
        return 'primary'
      case 'image':
        return 'secondary'
      case 'list':
        return 'success'
      case 'container':
        return 'warning'
      default:
        return 'default'
    }
  }

  const isNested = content.type === 'container' || content.type === 'list'
  const hasElements = content.elements && content.elements.length > 0

  return (
    <Paper
      elevation={level === 0 ? 2 : 1}
      sx={{
        mb: 2,
        ml: level * 2,
        borderLeft: level > 0 ? `3px solid` : 'none',
        borderColor: level > 0 ? `${getColor()}.main` : 'transparent',
      }}
    >
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          '&:before': { display: 'none' },
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'grey.50',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Chip
              icon={getIcon()}
              label={content.type.toUpperCase()}
              color={getColor()}
              size="small"
            />
            {content.id && (
              <Typography variant="caption" color="text.secondary">
                ID: {content.id}
              </Typography>
            )}
            {content.type === 'text' && (
              <Typography variant="body2" sx={{ flexGrow: 1, fontStyle: 'italic' }}>
                {content.value || '(empty)'}
              </Typography>
            )}
            {content.type === 'image' && (
              <Typography variant="body2" sx={{ flexGrow: 1, fontStyle: 'italic' }}>
                {content.value || '(no image)'}
              </Typography>
            )}
            {isNested && (
              <Typography variant="caption" color="text.secondary">
                {content.elements?.length || 0} element(s)
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* ID Field */}
            {content.id && (
              <TextField
                label="ID"
                value={content.id}
                disabled
                size="small"
                helperText="Content ID (read-only)"
              />
            )}

            {/* Value Field - for text and image */}
            {(content.type === 'text' || content.type === 'image') && (
              <TextField
                label={content.type === 'text' ? 'Text Content' : 'Image Path'}
                value={content.value}
                onChange={(e) => handleValueChange(e.target.value)}
                fullWidth
                multiline={content.type === 'text'}
                rows={content.type === 'text' ? 3 : 1}
                size="small"
              />
            )}

            {/* Path Field - hidden from UI but preserved in data */}

            {/* Nested Elements */}
            {isNested && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 1 }}>
                  <Typography variant="subtitle2">
                    {content.type === 'list' ? 'List Items' : 'Container Elements'}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    color="primary"
                  >
                    Add {content.type === 'list' ? 'Item' : 'Element'}
                  </Button>
                </Box>
                {hasElements ? (
                  content.elements!.map((element, index) => (
                    <Box key={index} sx={{ position: 'relative', mb: 1 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          zIndex: 10,
                          display: 'flex',
                          gap: 0.5,
                          backgroundColor: 'background.paper',
                          borderRadius: 1,
                          boxShadow: 1,
                        }}
                      >
                        <Tooltip title="Copy element">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleCopyElement(index)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.contrastText',
                              },
                            }}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {/* Only show remove button for list and container elements */}
                        {(content.type === 'list' || content.type === 'container') && (
                          <Tooltip title="Remove element">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveElement(index)}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'error.light',
                                  color: 'error.contrastText',
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      <ContentEditor
                        content={element}
                        onChange={(newElement) => handleElementChange(index, newElement)}
                        level={level + 1}
                        showRemove={element.type === 'list' || element.type === 'container'}
                        onRemove={element.type === 'list' || element.type === 'container' ? () => handleRemoveElement(index) : undefined}
                      />
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      p: 3,
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                      No elements
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleAddClick}
                    >
                      Add First {content.type === 'list' ? 'Item' : 'Element'}
                    </Button>
                  </Box>
                )}
              </Box>
            )}


            {/* Add Element Menu */}
            <Menu
              anchorEl={addMenuAnchor}
              open={Boolean(addMenuAnchor)}
              onClose={() => setAddMenuAnchor(null)}
            >
              <MenuItem onClick={() => handleMenuSelect('text')}>
                <TextIcon sx={{ mr: 1 }} /> Text
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect('image')}>
                <ImageIcon sx={{ mr: 1 }} /> Image
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect('container')}>
                <ContainerIcon sx={{ mr: 1 }} /> Container
              </MenuItem>
              <MenuItem onClick={() => handleMenuSelect('list')}>
                <ListIcon sx={{ mr: 1 }} /> List
              </MenuItem>
            </Menu>

            {/* Add Element Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Add New Element</DialogTitle>
              <DialogContent>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Element Type</InputLabel>
                  <Select
                    value={newElementType}
                    label="Element Type"
                    onChange={(e) => setNewElementType(e.target.value as Content['type'])}
                  >
                    <MenuItem value="text">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextIcon /> Text
                      </Box>
                    </MenuItem>
                    <MenuItem value="image">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ImageIcon /> Image
                      </Box>
                    </MenuItem>
                    <MenuItem value="container">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ContainerIcon /> Container
                      </Box>
                    </MenuItem>
                    <MenuItem value="list">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ListIcon /> List
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
                {/* CSS Path field hidden from UI but will be set automatically when needed */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddFromDialog} variant="contained" color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export default ContentEditor

