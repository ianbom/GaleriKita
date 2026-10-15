<?php

namespace App\Enums;

enum MediaStatus: string
{
    case Pending = 'pending';
    case Ready = 'ready';
    case DeletePending = 'delete_pending';
    case Deleted = 'deleted';
    case Failed = 'failed';
}
