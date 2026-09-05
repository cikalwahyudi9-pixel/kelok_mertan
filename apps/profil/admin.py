from django.contrib import admin
from apps.core.admin_mixins import DeleteActionMixin

from django.shortcuts import redirect
from django.urls import reverse
from .models import ProfilDesa, FasilitasDesa, KelompokTani


@admin.register(ProfilDesa)
class ProfilDesaAdmin(DeleteActionMixin, admin.ModelAdmin):
    fieldsets = (
        ('Identitas Utama & Lokasi', {
            'fields': ('nama_desa', 'kecamatan', 'kabupaten', 'provinsi',
                       'kode_pos', 'koordinat_lat', 'koordinat_lng', 'maps_embed_url')
        }),
        ('Konten Halaman Depan (Sekilas)', {
            'fields': ('deskripsi_singkat', 'foto_header')
        }),
        ('Konten Halaman Video Profil', {
            'fields': ('video_file', 'video_youtube_url', 'video_deskripsi',
                       'video_sinopsis', 'video_highlight',
                       'video_produksi', 'video_tahun', 'video_durasi', 'video_link')
        }),
        ('Data Wilayah & Sejarah', {
            'fields': ('luas_wilayah', 'jumlah_dusun', 'sejarah', 'kondisi_wilayah', 'demografi')
        }),
        ('Media Sosial', {
            'fields': ('sosmed_instagram', 'sosmed_facebook', 'sosmed_youtube', 'sosmed_whatsapp', 'sosmed_tiktok'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('updated_at',)

    def has_add_permission(self, request):
        """Mencegah penambahan profil baru jika sudah ada profil (maksimal 1)."""
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        """Mencegah penghapusan jika hanya ada 1 profil tersisa."""
        if self.model.objects.count() <= 1:
            return False
        return super().has_delete_permission(request, obj)

    def changelist_view(self, request, extra_context=None):
        """Langsung redirect ke halaman edit jika profil sudah ada."""
        if self.model.objects.exists():
            obj = self.model.objects.first()
            return redirect(reverse(f'admin:{self.model._meta.app_label}_{self.model._meta.model_name}_change', args=[obj.pk]))
        return redirect(reverse(f'admin:{self.model._meta.app_label}_{self.model._meta.model_name}_add'))


from django.utils.html import format_html

@admin.register(FasilitasDesa)
class FasilitasDesaAdmin(DeleteActionMixin, admin.ModelAdmin):
    list_display = ('nama', 'kategori', 'dusun', 'is_published', 'aksi_hapus')
    list_filter = ('kategori', 'is_published')
    list_editable = ('is_published',)
    actions = None  # Menonaktifkan dropdown action (seperti fitur hapus massal)

    def aksi_hapus(self, obj):
        delete_url = reverse('admin:profil_fasilitasdesa_delete', args=[obj.pk])
        # Using format_html for safety and FontAwesome for the trash icon (Jazzmin includes FontAwesome)
        return format_html(
            '<a href="{}" class="text-danger" style="font-size: 1.2rem; margin-left: 10px;" title="Hapus"><i class="fas fa-trash-alt"></i></a>',
            delete_url
        )
    aksi_hapus.short_description = 'Hapus'


@admin.register(KelompokTani)
class KelompokTaniAdmin(DeleteActionMixin, admin.ModelAdmin):
    list_display = ('nama', 'kategori', 'ketua', 'jumlah_anggota', 'is_published', 'aksi_hapus')
    list_filter = ('kategori', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('nama', 'ketua')
    actions = None

    def aksi_hapus(self, obj):
        delete_url = reverse('admin:profil_kelompoktani_delete', args=[obj.pk])
        return format_html(
            '<a href="{}" class="text-danger" style="font-size: 1.2rem; margin-left: 10px;" title="Hapus"><i class="fas fa-trash-alt"></i></a>',
            delete_url
        )
    aksi_hapus.short_description = 'Hapus'


