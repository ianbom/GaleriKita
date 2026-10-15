<?php

namespace App\Enums;

enum DrivePhotoStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Synced = 'synced';
    case Failed = 'failed';
    case Skipped = 'skipped';
}
