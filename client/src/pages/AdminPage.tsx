import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRequest } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Clock, 
  Home,
  MapPinned,
  FileText,
  ListPlus,
  Share2,
  Plus,
  LogOut,
  Eye, 
  ChevronDown 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  contacted: "bg-blue-500",
  quoted: "bg-purple-500",
  confirmed: "bg-green-500",
  completed: "bg-green-700",
  cancelled: "bg-red-500",
};

const AdminPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const quoteRequestsQuery = useQuery<any[]>({
    queryKey: ["/api/quote-requests"],
    refetchOnMount: true,
    staleTime: 0,
  });
  
  const { data: quoteRequests = [], isLoading, isError, refetch } = quoteRequestsQuery;
  
  // Log for debugging
  console.log("Quote requests state:", {
    data: quoteRequests,
    isLoading,
    isError,
    isFetching: quoteRequestsQuery.isFetching
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/quote-requests/${id}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "The quote request status has been updated successfully.",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update status: ${error}`,
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const viewDetails = (quote: any) => {
    setSelectedQuote(quote);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>{t("admin.error")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-3xl font-bold tracking-tight">{t("admin.title") || "Tableau de Bord"}</h1>
              <p className="mt-2 opacity-90">{t("admin.subtitle") || "Gérez vos demandes de devis"}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => refetch()}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                {t("admin.refresh") || "Rafraîchir"}
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white"
              >
                <LogOut className="h-4 w-4" />
                {t("admin.logout") || "Déconnexion"}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-100 p-4 rounded-b-lg shadow-md mb-4 text-sm font-medium">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>{t("admin.status.pending") || "En attente"}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>{t("admin.status.contacted") || "Contacté"}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span>{t("admin.status.quoted") || "Devis envoyé"}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span>{t("admin.status.confirmed") || "Confirmé"}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-700"></span>
              <span>{t("admin.status.completed") || "Terminé"}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>{t("admin.status.cancelled") || "Annulé"}</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="shadow-lg border-0 overflow-hidden">
        <CardContent className="p-0">
          {quoteRequests && quoteRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-b border-gray-200 hover:bg-gray-50/50">
                    <TableHead className="font-semibold py-4">{t("admin.columns.id") || "ID"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.name") || "Nom"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.email") || "Email"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.phone") || "Téléphone"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.moveType") || "Type"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.moveDate") || "Date"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.origin") || "Origine"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.destination") || "Destination"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.status") || "Statut"}</TableHead>
                    <TableHead className="font-semibold">{t("admin.columns.createdAt") || "Créé le"}</TableHead>
                    <TableHead className="font-semibold text-right">{t("admin.columns.actions") || "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quoteRequests.map((quote: any) => (
                    <TableRow key={quote.id} className="border-b hover:bg-blue-50/30">
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell className="font-medium">{`${quote.firstName} ${quote.lastName}`}</TableCell>
                      <TableCell className="text-blue-600">{quote.email}</TableCell>
                      <TableCell>{quote.phone}</TableCell>
                      <TableCell>
                        {quote.moveType === "International" ? (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {quote.moveType}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {quote.moveType}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{quote.moveDate}</TableCell>
                      <TableCell>{quote.originCity}</TableCell>
                      <TableCell>{quote.destinationCity}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[quote.status]} text-white`}>
                          {t(`admin.status.${quote.status}`) || quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(quote.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => viewDetails(quote)}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {t("admin.viewDetails") || "Détails"}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="secondary" 
                                size="sm"
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
                              >
                                {t("admin.changeStatus") || "Statut"}
                                <ChevronDown className="h-4 w-4 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 border border-gray-200 shadow-lg">
                              <DropdownMenuLabel className="border-b">
                                {t("admin.changeStatus") || "Changer le statut"}
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "pending")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                                {t("admin.status.pending") || "En attente"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "contacted")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                {t("admin.status.contacted") || "Contacté"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "quoted")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                                {t("admin.status.quoted") || "Devis envoyé"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "confirmed")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                {t("admin.status.confirmed") || "Confirmé"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "completed")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-green-700 mr-2"></span>
                                {t("admin.status.completed") || "Terminé"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(quote.id, "cancelled")}
                                className="flex items-center cursor-pointer"
                              >
                                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                {t("admin.status.cancelled") || "Annulé"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-20 px-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune demande</h3>
              <p className="text-muted-foreground">
                {t("admin.noRequests") || "Aucune demande de devis trouvée"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedQuote && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <DialogHeader className="text-white">
                <div className="flex items-center gap-2">
                  <Badge className={`${statusColors[selectedQuote.status]} text-white px-3 py-1`}>
                    {t(`admin.status.${selectedQuote.status}`) || selectedQuote.status}
                  </Badge>
                  <DialogTitle className="text-white">
                    {t("admin.details.title") || "Détails de la demande"} #{selectedQuote.id}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 opacity-70" />
                      {formatDate(selectedQuote.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 opacity-70" />
                      {`${selectedQuote.firstName} ${selectedQuote.lastName}`}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 opacity-70" />
                      {selectedQuote.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 opacity-70" />
                      {selectedQuote.phone}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </div>
            
            <div className="p-6">
              <Tabs defaultValue="personal" className="mt-2">
                <TabsList className="grid grid-cols-4 bg-gray-100">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-white">
                    <User className="h-4 w-4 mr-2" />
                    {t("admin.details.personalInfo") || "Informations"}
                  </TabsTrigger>
                  <TabsTrigger value="move" className="data-[state=active]:bg-white">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t("admin.details.moveDetails") || "Déménagement"}
                  </TabsTrigger>
                  <TabsTrigger value="inventory" className="data-[state=active]:bg-white">
                    <Package className="h-4 w-4 mr-2" />
                    {t("admin.details.inventory") || "Inventaire"}
                  </TabsTrigger>
                  <TabsTrigger value="additional" className="data-[state=active]:bg-white">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("admin.details.additionalServices") || "Services"}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <div className="space-y-4 mt-6 bg-white p-6 rounded-lg border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="shadow-sm">
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            {t("admin.details.personalInfo") || "Informations personnelles"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <p className="font-semibold text-gray-700">{t("quote.steps.personal.firstName") || "Prénom"}:</p>
                              <p className="text-lg">{selectedQuote.firstName}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700">{t("quote.steps.personal.lastName") || "Nom"}:</p>
                              <p className="text-lg">{selectedQuote.lastName}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="shadow-sm">
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-600" />
                            {t("admin.details.contactInfo") || "Coordonnées"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <p className="font-semibold text-gray-700">{t("quote.steps.personal.email") || "Email"}:</p>
                              <p className="text-lg text-blue-600">{selectedQuote.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700">{t("quote.steps.personal.phone") || "Téléphone"}:</p>
                              <p className="text-lg">{selectedQuote.phone}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="move">
                  <div className="space-y-4 mt-6 bg-white p-6 rounded-lg border">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <Card className="shadow-sm flex-1">
                          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <Clock className="h-5 w-5 text-blue-600" />
                              {t("admin.details.moveInfo") || "Informations de déménagement"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.moveType") || "Type"}:</p>
                                <Badge className={selectedQuote.moveType === "International" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : "bg-green-100 text-green-800 hover:bg-green-100"}>
                                  {selectedQuote.moveType}
                                </Badge>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.moveDate") || "Date"}:</p>
                                <p>{selectedQuote.moveDate}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <Card className="shadow-sm flex-1">
                          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <Home className="h-5 w-5 text-blue-600" />
                              {t("admin.details.origin") || "Adresse d'origine"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.originAddress") || "Adresse"}:</p>
                                <p>{selectedQuote.originAddress}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.originCity") || "Ville"}:</p>
                                <p className="text-lg font-medium">{selectedQuote.originCity}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-sm flex-1">
                          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <MapPinned className="h-5 w-5 text-blue-600" />
                              {t("admin.details.destination") || "Adresse de destination"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.destinationAddress") || "Adresse"}:</p>
                                <p>{selectedQuote.destinationAddress}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-700">{t("quote.steps.move.destinationCity") || "Ville"}:</p>
                                <p className="text-lg font-medium">{selectedQuote.destinationCity}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory">
                  <div className="space-y-4 mt-6 bg-white p-6 rounded-lg border">
                    <div className="grid grid-cols-1 gap-6">
                      <Card className="shadow-sm">
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Home className="h-5 w-5 text-blue-600" />
                            {t("quote.steps.inventory.homeSize") || "Taille du logement"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-lg font-medium">{selectedQuote.homeSize}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="shadow-sm">
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-600" />
                            {t("quote.steps.inventory.mainFurniture") || "Inventaire des meubles"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <pre className="p-4 bg-gray-50 rounded-md overflow-auto text-sm">
                            {JSON.stringify(JSON.parse(selectedQuote.inventory), null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                      
                      {selectedQuote.additionalNotes && (
                        <Card className="shadow-sm">
                          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-600" />
                              {t("admin.details.notes") || "Notes additionnelles"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <p>{selectedQuote.additionalNotes}</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="additional">
                  <div className="space-y-4 mt-6 bg-white p-6 rounded-lg border">
                    <div className="grid grid-cols-1 gap-6">
                      {selectedQuote.additionalServices && (
                        <Card className="shadow-sm">
                          <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <ListPlus className="h-5 w-5 text-blue-600" />
                              {t("quote.steps.services.title") || "Services additionnels"}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <pre className="p-4 bg-gray-50 rounded-md overflow-auto text-sm">
                              {JSON.stringify(JSON.parse(selectedQuote.additionalServices), null, 2)}
                            </pre>
                          </CardContent>
                        </Card>
                      )}
                      
                      <Card className="shadow-sm">
                        <CardHeader className="bg-gray-50 p-4 rounded-t-lg">
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Share2 className="h-5 w-5 text-blue-600" />
                            {t("quote.steps.services.referral") || "Source de référence"}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-lg font-medium">{selectedQuote.referralSource}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsDetailsOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  {t("admin.details.close") || "Fermer"}
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // Logique pour contacter le client (pourrait ouvrir un mail, etc.)
                    window.open(`mailto:${selectedQuote.email}?subject=Votre demande de devis chez Coeur Souss Transport`);
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {t("admin.details.contact") || "Contacter le client"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminPage;
