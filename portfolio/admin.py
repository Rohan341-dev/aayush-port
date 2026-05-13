from django.contrib import admin
from .models import ContactMessage, PricingTier, ProcessStep, Project, Review, Skill


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'category', 'tech_stack')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'stars', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'role', 'text')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'proficiency', 'group', 'order')
    list_editable = ('proficiency', 'group', 'order')
    search_fields = ('name',)


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)


@admin.register(PricingTier)
class PricingTierAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_label', 'featured', 'order')
    list_editable = ('featured', 'order')
    search_fields = ('name',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('company_name', 'email', 'message')
