<?php

namespace App\Models;

use App\Enums\PresetKind;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['kind', 'name', 'code', 'version_number', 'effect_settings', 'preview_media_asset_id', 'sort_order', 'is_active'])]
class PhotoPreset extends Model
{
    protected function casts(): array
    {
        return [
            'kind' => PresetKind::class,
            'version_number' => 'integer',
            'effect_settings' => 'array',
            'preview_media_asset_id' => 'integer',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<MediaAsset, $this> */
    public function previewMediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'preview_media_asset_id');
    }

    /** @return HasMany<Photo, $this> */
    public function colorPhotos(): HasMany
    {
        return $this->hasMany(Photo::class, 'color_preset_id');
    }

    /** @return HasMany<Photo, $this> */
    public function borderPhotos(): HasMany
    {
        return $this->hasMany(Photo::class, 'border_preset_id');
    }
}
