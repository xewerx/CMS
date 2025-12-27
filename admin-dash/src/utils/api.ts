import type { Website, WebsiteDetail, UpdateWebsiteDto } from '../types/website'

const API_BASE_URL = 'http://localhost:3000'

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('accessToken')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Decode JWT token to get user ID (JWT payload is base64 encoded, no secret needed to read)
function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = JSON.parse(atob(parts[1]))
    return payload.user_id as string | null
  } catch {
    return null
  }
}

export async function fetchWebsites(): Promise<Website[]> {
  const response = await fetch(`${API_BASE_URL}/websites`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch websites')
  }

  return response.json()
}

export async function fetchWebsiteDetail(websiteId: string): Promise<WebsiteDetail> {
  const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch website details')
  }

  return response.json()
}

export async function updateWebsite(
  websiteId: string,
  data: UpdateWebsiteDto
): Promise<void> {
  // Ensure redactors includes the current user
  const userId = getUserIdFromToken()
  if (userId && !data.redactors.includes(userId)) {
    data.redactors = [...data.redactors, userId]
  }

  const response = await fetch(`${API_BASE_URL}/websites/${websiteId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Failed to update website')
  }
}

export function getCurrentUserId(): string | null {
  return getUserIdFromToken()
}

