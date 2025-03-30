import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assessmentApi, type Assessment } from '@/src/api/assessment';
import { toast } from 'sonner';

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const dummyAssessments = [
  //   {
  //     id: '1',
  //     date: new Date(),
  //     pattern: 'regular',
  //     age: '18_24',
  //     cycleLength: '26_30',
  //   },
  //   {
  //     id: '2',
  //     date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  //     pattern: 'irregular',
  //     age: '18_24',
  //     cycleLength: 'irregular',
  //   },
  // ];

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await assessmentApi.list();
        setAssessments(data);
      } catch (error) {
        toast.error('Failed to load assessments');
        console.error('Error fetching assessments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Assessment History</h1>
          <Link
            to="/assessment"
            className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            New Assessment
          </Link>
        </div>

        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start your first assessment to track your menstrual health.
            </p>
            <div className="mt-6">
              <Link
                to="/assessment"
                className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Start Assessment
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <Link
                key={assessment.id}
                to={`/assessment/history/${assessment.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        {assessment.pattern.charAt(0).toUpperCase() + assessment.pattern.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(assessment.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Age: {assessment.age.replace('_', '-')} years</p>
                      <p>Cycle Length: {assessment.cycleLength.replace('_', '-')} days</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 