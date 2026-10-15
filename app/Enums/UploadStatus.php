<?php

namespace App\Enums;

enum UploadStatus: string
{
    case Reserved = 'reserved';
    case Completed = 'completed';
    case Expired = 'expired';
    case Cancelled = 'cancelled';
}
