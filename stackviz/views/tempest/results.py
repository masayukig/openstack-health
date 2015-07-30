from django.core.urlresolvers import reverse
from django.views.generic import TemplateView, RedirectView
from django.http import Http404

from stackviz.parser.tempest_subunit import get_repositories


class ResultsView(TemplateView):
    template_name = 'tempest/results.html'

    def get_context_data(self, **kwargs):
        context = super(ResultsView, self).get_context_data(**kwargs)
        context['run_id'] = self.kwargs['run_id']

        return context

