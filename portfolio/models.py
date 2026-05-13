from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=120)
    category = models.CharField(max_length=60, blank=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    tech_stack = models.CharField(max_length=255, blank=True)
    live_url = models.URLField(blank=True)
    code_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def tech_list(self):
        return [item.strip() for item in self.tech_stack.split(',') if item.strip()]

    def __str__(self):
        return self.title


class Review(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=120, blank=True)
    text = models.TextField()
    stars = models.PositiveSmallIntegerField(default=5)
    avatar_background = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=80)
    proficiency = models.PositiveSmallIntegerField(default=80)
    order = models.PositiveIntegerField(default=0)
    group = models.CharField(max_length=60, blank=True, help_text='Group name for layout columns')

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class ProcessStep(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=32, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class PricingTier(models.Model):
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=255, blank=True)
    price_label = models.CharField(max_length=80, blank=True)
    features = models.JSONField(default=list, blank=True)
    cta_text = models.CharField(max_length=80, default='Get Started')
    order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    company_name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    budget = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.company_name} - {self.email}'
