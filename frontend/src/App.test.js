import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';

// A helper function to render the App component with MemoryRouter
const renderWithRouter = (initialRoute = '/') => {
  window.history.pushState({}, '', initialRoute);
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  test('renders LoginPanel when not logged in', () => {
    renderWithRouter('/login');

    // Assuming LoginPanel has a text "Login" in it
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('navigates to DashboardPage when logged in', () => {
    renderWithRouter('/dashboard');

    // Simulate login (You might need to adjust this based on your app's logic)
    // For example, if logging in changes the URL to '/dashboard'
    const loginButton = screen.getByRole('button', { name: /log in/i });
    userEvent.click(loginButton);

    // Assuming DashboardPage has a text "Dashboard" in it
    const dashboardElement = screen.getByText(/dashboard/i);
    expect(dashboardElement).toBeInTheDocument();
  });

  test('renders ExpensesPage when on expenses route', () => {
    renderWithRouter('/expenses');

    // Assuming ExpensesPage has a text "Expenses" in it
    const expensesElement = screen.getByText(/expenses/i);
    expect(expensesElement).toBeInTheDocument();
  });

  test('renders TokenNotification when token is present', () => {
    // Adjust the route or logic based on how your app shows the token notification
    renderWithRouter('/some-route-that-shows-token-notification');

    // Assuming TokenNotification has a text "Token" in it
    const tokenElement = screen.getByText(/token/i);
    expect(tokenElement).toBeInTheDocument();
  });

  test('renders DashboardNavigation always', () => {
    renderWithRouter();

    // Assuming DashboardNavigation has a text "Navigation" in it
    const navigationElement = screen.getByText(/navigation/i);
    expect(navigationElement).toBeInTheDocument();
  });
});
