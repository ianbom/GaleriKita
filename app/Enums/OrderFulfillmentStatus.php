<?php

namespace App\Enums;

enum OrderFulfillmentStatus: string
{
    case Pending = 'pending';
    case Applied = 'applied';
    case RequiresReview = 'requires_review';
}
