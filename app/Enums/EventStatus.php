<?php

namespace App\Enums;

enum EventStatus: string
{
    case Draft = 'draft';
    case PendingPayment = 'pending_payment';
    case Published = 'published';
    case Cancelled = 'cancelled';
    case Archived = 'archived';
}
