<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case Initiating = 'initiating';
    case Pending = 'pending';
    case Paid = 'paid';
    case Failed = 'failed';
    case Expired = 'expired';
    case Cancelled = 'cancelled';
    case RequiresReview = 'requires_review';
}
