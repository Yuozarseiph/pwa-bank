export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-8 fixed bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">© 1404 اپلیکیشن من - تمام حقوق محفوظ است</p>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-500 hover:text-gray-700">حریم خصوصی</a>
            <a href="/terms" className="text-gray-500 hover:text-gray-700">قوانین</a>
            <a href="/contact" className="text-gray-500 hover:text-gray-700">پشتیبانی</a>
          </div>
        </div>
      </div>
    </footer>
  );
}