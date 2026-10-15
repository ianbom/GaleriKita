<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_guests', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id');
            $table->string('display_name', 150);
            $table->enum('status', ['active', 'blocked'])->default('active');
            $table->integer('uploads_used')->default(0);
            $table->integer('uploads_reserved')->default(0);
            $table->timestampTz('joined_at');
            $table->timestampTz('created_at')->nullable();
            $table->timestampTz('updated_at')->nullable();
            $table->index(['event_id', 'joined_at'], 'event_guests_event_id_joined_at_index');
            $table->index(['event_id', 'status'], 'event_guests_event_id_status_index');
            $table->foreign('event_id', 'event_guests_event_id_foreign')->references('id')->on('events');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_guests');
    }
};
