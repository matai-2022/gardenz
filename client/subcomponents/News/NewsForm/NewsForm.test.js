import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRedux from '@testing-library/render-with-redux'
import test-utils from '@testing-library/test-utils'
import NewsForm from './NewsForm'

// make mock.jest data like news.test

describe('event form field', () => {
  it('updates correctly on user input', async () => {
    const emptyForm = {
      title: '',
      content: '',
      gardenId: '',
    }
    const submitNews = jest.mock()
    // render(<NewsForm formData={emptyForm} />)
    renderWithRedux(<NewsForm formData={{ emptyForm }} />, {})

    const titleInput = screen.getByRole('textbox', { name: 'News Title' })
    const contentInput = screen.getByRole('textbox', {
      name: 'Content',
    })
    const gardenInput = screen.getByRole('option', { name: 'selectGarden' })

    userEvent.type(titleInput, 'test title')
    userEvent.type(contentInput, 'cool news, yeiyah!')
    userEvent.type(gardenInput, '1')

    await waitFor(() => {
      expect(titleInput).toHaveValue('test title')
      expect(contentInput).toHaveTextContent(/yeiyah/)
      expect(gardenInput).toHaveValue('1')
    })
  })

  it('required comes up on invalid input', async () => {
    const handleSubmit = jest.fn()
    const mockForm = {
      title: 'mock title',
      content: 'rad news',
    }

    render(<NewsForm onSubmit={handleSubmit} formData={mockForm} />)
    userEvent.clear(screen.getByLabelText(/news title/i))
    userEvent.clear(screen.getByLabelText(/content/i))

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    const ele = await screen.findAllByText('Required')

    expect(ele).toHaveLength(2)
    expect(ele[0]).toBeInTheDocument()
  })
})
