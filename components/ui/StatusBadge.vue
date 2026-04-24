<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="badgeClass">{{ status }}</span>
</template>
<script setup>
const props = defineProps({ status: String })
const badgeClass = computed(() => ({
  'Submitted': 'status-submitted',
  'Acknowledged': 'status-acknowledged',
  'Under Review': 'status-review',
  'Assigned': 'status-assigned',
  'In Progress': 'status-progress',
  'Resolved': 'status-resolved',
  'Closed': 'status-closed',
  'Escalated': 'status-escalated',
  'Reopened': 'status-reopened',
  'Completed': 'status-resolved',
  'Ongoing': 'status-progress',
  'Not Started': 'status-closed',
  'Active': 'status-resolved',
  'connected': 'status-resolved',
  'degraded': 'status-reopened',
  'disconnected': 'status-escalated',
}[props.status] || 'status-closed'))
</script>
