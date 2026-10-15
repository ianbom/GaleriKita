<?php

namespace App\Models;

use App\Enums\MediaStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable(['storage_disk', 'storage_key', 'provider_asset_id', 'provider_resource_type', 'provider_delivery_type', 'provider_version', 'mime_type', 'file_size_bytes', 'width', 'height', 'checksum_sha256', 'status', 'uploaded_at'])]
class MediaAsset extends Model
{
    protected function casts(): array
    {
        return [
            'provider_version' => 'integer',
            'file_size_bytes' => 'integer',
            'width' => 'integer',
            'height' => 'integer',
            'status' => MediaStatus::class,
            'uploaded_at' => 'datetime',
            'deleted_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return HasMany<Event, $this> */
    public function coverEvents(): HasMany
    {
        return $this->hasMany(Event::class, 'cover_media_asset_id');
    }

    /** @return HasMany<PhotoPreset, $this> */
    public function previewPresets(): HasMany
    {
        return $this->hasMany(PhotoPreset::class, 'preview_media_asset_id');
    }

    /** @return HasOne<Photo, $this> */
    public function finalPhoto(): HasOne
    {
        return $this->hasOne(Photo::class, 'final_media_asset_id');
    }

    /** @return HasOne<PhotoVariant, $this> */
    public function photoVariant(): HasOne
    {
        return $this->hasOne(PhotoVariant::class, 'media_asset_id');
    }
}
