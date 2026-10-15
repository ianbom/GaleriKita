<?php

namespace App\Models;

use App\Enums\PhotoVariantKind;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['photo_id', 'kind', 'media_asset_id'])]
class PhotoVariant extends Model
{
    protected function casts(): array
    {
        return [
            'photo_id' => 'integer',
            'kind' => PhotoVariantKind::class,
            'media_asset_id' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Photo, $this> */
    public function photo(): BelongsTo
    {
        return $this->belongsTo(Photo::class, 'photo_id')->withTrashed();
    }

    /** @return BelongsTo<MediaAsset, $this> */
    public function mediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'media_asset_id');
    }
}
