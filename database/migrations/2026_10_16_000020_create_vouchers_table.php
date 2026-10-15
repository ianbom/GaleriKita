<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code', 80)->unique();
            $table->string('name', 150);
            $table->text('description')->nullable();
            $table->bigInteger('created_by_user_id');
            $table->enum('discount_type', ['percentage', 'fixed']);
            $table->bigInteger('discount_value');
            $table->bigInteger('max_discount_idr')->nullable();
            $table->bigInteger('min_order_idr')->default(0);
            $table->enum('applicability', ['initial', 'upgrade', 'both'])->default('initial');
            $table->integer('usage_limit')->nullable();
            $table->integer('usage_limit_per_user')->default(1);
            $table->timestampTz('starts_at')->nullable();
            $table->timestampTz('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->timestampTz('deleted_at')->nullable();
            $table->index(['is_active', 'starts_at', 'expires_at'], 'vouchers_is_active_starts_at_expires_at_index');
            $table->index(['created_by_user_id'], 'vouchers_created_by_user_id_index');
            $table->foreign('created_by_user_id', 'vouchers_created_by_user_id_foreign')->references('id')->on('users');
        });

        DB::statement('CREATE UNIQUE INDEX vouchers_code_case_insensitive_unique ON vouchers (LOWER(code))');
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
