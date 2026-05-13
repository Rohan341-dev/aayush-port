from django.shortcuts import redirect, render
from django.contrib import messages

from .forms import ContactForm
from .models import ContactMessage, PricingTier, ProcessStep, Project, Review, Skill


def get_default_portfolio_context():
    projects = list(Project.objects.all())
    if not projects:
        projects = [
            {
                'title': 'Online Store Platform',
                'category': 'E-Commerce',
                'image_url': 'https://via.placeholder.com/600x400?text=E-Commerce+Platform',
                'tech_list': ['Next.js', 'Tailwind', 'Stripe'],
                'live_url': '#',
                'code_url': '#',
            },
            {
                'title': 'Analytics Dashboard',
                'category': 'SaaS',
                'image_url': 'https://via.placeholder.com/600x400?text=SaaS+Dashboard',
                'tech_list': ['React', 'Node.js', 'MongoDB'],
                'live_url': '#',
                'code_url': '#',
            },
            {
                'title': 'Agency Branding',
                'category': 'Website',
                'image_url': 'https://via.placeholder.com/600x400?text=Agency+Website',
                'tech_list': ['Next.js', 'Framer', 'CMS'],
                'live_url': '#',
                'code_url': '#',
            },
        ]

    reviews = list(Review.objects.all())
    if not reviews:
        reviews = [
            {
                'stars': 5,
                'text': 'Aayush delivered an exceptional website that perfectly captures our brand. The design is modern, the performance is incredible, and the user experience is outstanding.',
                'name': 'Sarah Johnson',
                'role': 'CEO, TechStart Inc',
                'avatar_background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
            {
                'stars': 5,
                'text': 'Working with Aayush was seamless. The website not only looks amazing but has increased our conversions by 45%. Professional, creative, and delivers on time!',
                'name': 'Michael Chen',
                'role': 'Founder, Digital Hub',
                'avatar_background': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            },
            {
                'stars': 5,
                'text': 'The best designer I\'ve worked with. Aayush understood our vision instantly and executed it perfectly. The attention to detail is remarkable.',
                'name': 'Emma Davis',
                'role': 'Marketing Director',
                'avatar_background': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            },
        ]

    skills = list(Skill.objects.all())
    if not skills:
        skills = [
            {'name': 'React.js', 'proficiency': 95, 'group': 'left'},
            {'name': 'Next.js', 'proficiency': 92, 'group': 'left'},
            {'name': 'Node.js', 'proficiency': 88, 'group': 'left'},
            {'name': 'Tailwind CSS', 'proficiency': 96, 'group': 'left'},
            {'name': 'MongoDB', 'proficiency': 85, 'group': 'right'},
            {'name': 'UI/UX Design', 'proficiency': 90, 'group': 'right'},
            {'name': 'WordPress', 'proficiency': 82, 'group': 'right'},
            {'name': 'Shopify', 'proficiency': 87, 'group': 'right'},
        ]
    else:
        skills = [
            {
                'name': skill.name,
                'proficiency': skill.proficiency,
                'group': skill.group or 'left',
            }
            for skill in skills
        ]

    left_skills = [skill for skill in skills if skill['group'] == 'left']
    right_skills = [skill for skill in skills if skill['group'] != 'left']

    process_steps = list(ProcessStep.objects.all())
    if not process_steps:
        process_steps = [
            {'title': 'Discovery & Strategy', 'description': 'We discuss your business goals, target audience, and vision to create a strategic roadmap for your website.', 'icon': '🎯'},
            {'title': 'Design & Development', 'description': 'I create stunning designs with cutting-edge technology, focusing on both aesthetics and performance.', 'icon': '🎨'},
            {'title': 'Launch & Support', 'description': 'Your website goes live with full optimization. I provide ongoing support to ensure everything runs smoothly.', 'icon': '✅'},
        ]

    pricing_tiers = list(PricingTier.objects.all())
    if not pricing_tiers:
        pricing_tiers = [
            {
                'name': 'Starter',
                'description': 'Perfect for small projects and startups',
                'price_label': '$2,999',
                'features': ['Up to 5 pages', 'Responsive design', 'SEO optimization', 'Contact form', '2 revisions'],
                'cta_text': 'Get Started',
                'featured': False,
            },
            {
                'name': 'Professional',
                'description': 'Most popular for growing businesses',
                'price_label': '$5,999',
                'features': ['Up to 15 pages', 'Advanced features', 'Full SEO strategy', 'E-commerce ready', '5 revisions', '2 months support'],
                'cta_text': 'Start Project',
                'featured': True,
            },
            {
                'name': 'Enterprise',
                'description': 'For complex, custom solutions',
                'price_label': 'Custom',
                'features': ['Unlimited pages', 'Custom integrations', 'Performance optimization', 'API development', 'Unlimited revisions', '6 months support'],
                'cta_text': 'Request Quote',
                'featured': False,
            },
        ]

    return {
        'projects': projects,
        'reviews': reviews,
        'left_skills': left_skills,
        'right_skills': right_skills,
        'process_steps': process_steps,
        'pricing_tiers': pricing_tiers,
    }


def home_view(request):
    context = get_default_portfolio_context()
    context['form'] = ContactForm()
    return render(request, 'index.html', context)


def contact_view(request):
    if request.method != 'POST':
        return redirect('home')

    form = ContactForm(request.POST)
    context = get_default_portfolio_context()
    if form.is_valid():
        form.save()
        messages.success(request, 'Thank you! Your message has been received. I will get back to you soon.')
        return redirect('home')

    context['form'] = form
    return render(request, 'index.html', context)
