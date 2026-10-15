<?php

namespace App\Enums;

enum VoucherDiscountType: string
{
    case Percentage = 'percentage';
    case Fixed = 'fixed';
}
