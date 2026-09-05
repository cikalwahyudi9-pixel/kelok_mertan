from django.contrib import admin
from apps.core.admin_mixins import DeleteActionMixin

from .models import EventKesehatan, DataAgregatKesehatan


class DataAgregatInline(admin.TabularInline):
    model = DataAgregatKesehatan
    extra = 3
    fields = ('indikator', 'label_nilai', 'jumlah', 'keterangan')


@admin.register(EventKesehatan)
class EventKesehatanAdmin(DeleteActionMixin, admin.ModelAdmin):
    list_display = ('nama_kegiatan', 'tanggal', 'dusun', 'jumlah_peserta', 'is_published')
    list_filter = ('is_published', 'tanggal')
    list_editable = ('is_published',)
    search_fields = ('nama_kegiatan', 'dusun')
    inlines = [DataAgregatInline]
    fieldsets = (
        ('Detail Kegiatan', {
            'fields': ('nama_kegiatan', 'tanggal', 'dusun', 'jumlah_peserta', 'rentang_usia')
        }),
        ('Catatan & Disclaimer', {
            'fields': ('catatan', 'disclaimer_text'),
            'description': (
                '⚠️ WAJIB: Hanya isi dengan data AGREGAT & ANONIM. '
                'Jangan masukkan nama, NIK, atau identitas individu.'
            ),
        }),
        ('Pengaturan', {
            'fields': ('is_published',)
        }),
    )
