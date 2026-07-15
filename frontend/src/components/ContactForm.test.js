import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

const fillValidForm = async (user) => {
  await user.type(screen.getByLabelText(/^Nom/i), 'Jean Dupont');
  await user.type(screen.getByLabelText(/^Email/i), 'jean.dupont@example.com');
  await user.type(screen.getByLabelText(/^Objet/i), 'Demande de devis');
  await user.type(
    screen.getByLabelText(/^Message/i),
    'Bonjour, je souhaite obtenir un devis pour une commande.'
  );
};

describe('ContactForm', () => {
  it('affiche les champs et le bouton d envoi', () => {
    render(<ContactForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/^Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Objet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer le message/i })).toBeInTheDocument();
  });

  it('affiche des erreurs si le formulaire est vide', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: /envoyer le message/i }));

    expect(await screen.findByText('Le nom est requis')).toBeInTheDocument();
    expect(screen.getByText("L'email est requis")).toBeInTheDocument();
    expect(screen.getByText("L'objet est requis")).toBeInTheDocument();
    expect(screen.getByText('Le message est requis')).toBeInTheDocument();
  });

  it('rejette un email invalide', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText(/^Nom/i), 'Jean Dupont');
    await user.type(screen.getByLabelText(/^Email/i), 'email-invalide');
    await user.type(screen.getByLabelText(/^Objet/i), 'Devis');
    await user.type(screen.getByLabelText(/^Message/i), 'Message suffisamment long');
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }));

    expect(await screen.findByText("L'email n'est pas valide")).toBeInTheDocument();
  });

  it('rejette un message trop court', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.type(screen.getByLabelText(/^Nom/i), 'Jean Dupont');
    await user.type(screen.getByLabelText(/^Email/i), 'jean@example.com');
    await user.type(screen.getByLabelText(/^Objet/i), 'Devis');
    await user.type(screen.getByLabelText(/^Message/i), 'Court');
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }));

    expect(
      await screen.findByText('Le message doit contenir au moins 10 caractères')
    ).toBeInTheDocument();
  });

  it('appelle onSubmit avec les donnees valides', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockResolvedValue({
      success: true,
      message: 'Message envoyé avec succès',
    });

    render(<ContactForm onSubmit={onSubmit} />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        nom: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        objet: 'Demande de devis',
        message: 'Bonjour, je souhaite obtenir un devis pour une commande.',
      });
    });

    expect(await screen.findByText('Message envoyé avec succès')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom/i)).toHaveValue('');
  });

  it('affiche une erreur si onSubmit echoue', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockRejectedValue(new Error('Erreur API'));

    render(<ContactForm onSubmit={onSubmit} />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }));

    expect(
      await screen.findByText('Une erreur est survenue. Veuillez réessayer.')
    ).toBeInTheDocument();
  });
});
