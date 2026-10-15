<?php

namespace App\Models;

use App\Enums\GalleryVisibility;
use App\Enums\RevealMode;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['event_id', 'visibility', 'photo_reveal_mode'])]
class EventSetting extends Model
{
    protected function casts(): array
    {
        return [
            'event_id' => 'integer',
            'visibility' => GalleryVisibility::class,
            'photo_reveal_mode' => RevealMode::class,
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<Event, $this> */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }
}
