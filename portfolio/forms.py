from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['company_name', 'email', 'message', 'budget']
        widgets = {
            'company_name': forms.TextInput(attrs={
                'placeholder': 'Your Company',
                'id': 'companyName',
                'required': True,
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'your@email.com',
                'id': 'clientEmail',
                'required': True,
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Tell me about your project...',
                'id': 'projectDetails',
                'required': True,
                'rows': 5,
            }),
            'budget': forms.TextInput(attrs={
                'placeholder': 'Estimated budget (optional)',
                'id': 'projectBudget',
            }),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and '@' not in email:
            raise forms.ValidationError('Enter a valid email address.')
        return email
