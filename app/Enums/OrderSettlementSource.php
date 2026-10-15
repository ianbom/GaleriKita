<?php

namespace App\Enums;

enum OrderSettlementSource: string
{
    case Midtrans = 'midtrans';
    case VoucherFullDiscount = 'voucher_full_discount';
}
