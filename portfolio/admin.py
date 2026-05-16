from django.contrib import admin
from .models import ProfileSettings, DesignProject, Review, FAQ

@admin.register(ProfileSettings)
class ProfileSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Limit to only one settings record
        if self.model.objects.exists():
            return False
        return True

@admin.register(DesignProject)
class DesignProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order', 'is_before_after')
    list_editable = ('order',)
    list_filter = ('category', 'is_before_after')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'sub_count', 'is_verified', 'order')
    list_editable = ('order', 'is_verified')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    list_editable = ('order',)
