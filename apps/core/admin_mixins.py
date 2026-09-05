from django.utils.html import format_html
from django.urls import reverse

class DeleteActionMixin:
    actions = None

    def get_list_display(self, request):
        list_display = super().get_list_display(request)
        if list_display and isinstance(list_display, (list, tuple)):
            if 'aksi_hapus' not in list_display:
                return list(list_display) + ['aksi_hapus']
        return list_display

    def aksi_hapus(self, obj):
        try:
            app_label = obj._meta.app_label
            model_name = obj._meta.model_name
            delete_url = reverse(f'admin:{app_label}_{model_name}_delete', args=[obj.pk])
            return format_html(
                '<a href="{}" class="text-danger" style="font-size: 1.2rem; margin-left: 10px;" title="Hapus"><i class="fas fa-trash-alt"></i></a>',
                delete_url
            )
        except Exception:
            return ""
    aksi_hapus.short_description = 'Hapus'
